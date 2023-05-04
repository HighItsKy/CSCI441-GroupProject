import { useRef, useState, useCallback, useEffect } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';

function Drawing({ height, width, imageData, setImageData, backgroundImage, index, field }) {

    const canvasRef = useRef(null);
    const canvasBackgroundRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(null);
    const [strokeVal, setStrokeVal] = useState('draw');

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        if (imageData === null) { clearCanvas(); }
        const drawImg = new Image();
        if (imageData) {
            drawImg.src = imageData;
            drawImg.onload = () => { context.drawImage(drawImg, 0, 0) };
        }
    }, [imageData]);

    useEffect(() => {
        const context = canvasBackgroundRef.current.getContext("2d");
        const bgImage = new Image();

        if (backgroundImage) {
            bgImage.src = backgroundImage;
            bgImage.onload = () => { context.drawImage(bgImage, 0, 0) };
        }

    }, [backgroundImage]);

    const clearCanvas = () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    const startPaint = useCallback((event) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    const paint = useCallback(
        (event) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
        if (setImageData) {
            if (index) {
                setImageData(canvasRef.current.toDataURL(), index);
            } else {
                setImageData(canvasRef.current.toDataURL(), field);
            }
        }
    }, [setImageData]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    const getCoordinates = (event) => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };

    const drawLine = (originalMousePosition, newMousePosition) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {

            context.strokeStyle = 'black';
            context.lineJoin = 'round';

            if (strokeVal === 'draw') {
                context.globalCompositeOperation = "source-over";
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(originalMousePosition.x, originalMousePosition.y);
                context.lineTo(newMousePosition.x, newMousePosition.y);
                context.closePath();

                context.stroke();
            } else {
                context.globalCompositeOperation = "destination-out";
                context.lineWidth = 15;

                context.beginPath();
                context.moveTo(originalMousePosition.x, originalMousePosition.y);
                context.lineTo(newMousePosition.x, newMousePosition.y);
                context.closePath();

                context.stroke();
            }
        }
    };

    return (
        <>
            <br />
            <Button id="draw" onClick={() => setStrokeVal('draw')}>Draw</Button>
            <Button id="erase" onClick={() => setStrokeVal('erase')}>Erase</Button>
            <Button id="clear" onClick={clearCanvas}>Clear</Button>
            <br />
            <div style={{ position: 'relative' }}>
                <canvas
                    id="backgroundCanvas"
                    ref={canvasBackgroundRef}
                    height={height}
                    width={width}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
            </div>
            <canvas
                id="drawingCanvas"
                ref={canvasRef}
                height={height}
                width={width}
                style={{ border: '1px solid #000000', position: 'relative', background: 'transparent' }}
            />


        </>
    )
}

export default Drawing;