// import any components you want to use in this file:
import Navbar from './Navbar';
import JobList from './JobList';




function Home() {

    const adminUser = {
        id: 101,
        isAdmin: true,
        isDriver: false,
        firstName: "Chris",
        lastName: "Pratt",
        username: "starlord1982",
        password: "12345",
        phone: "(123) 456-7890",
        streetAddress: "123 Star Court",
        city: "city",
        state: "state",
        email: "email@mail.com"
    }
    const driverUser = {
        id: 501,
        isAdmin: false,
        isDriver: true,
        firstName: "Rocket",
        lastName: "Racoon",
        username: "firepower777",
        password: "54321",
        phone: "(111) 222-3333",
        streetAddress: "444 emerald drive",
        city: "other city",
        state: "other state",
        email: "rocket@email.com"
    }

    



    return (
        <div>
            <Navbar />
            <main>
                This is the Home page
            </main>
            {/* pass adminUser data if you want to see what the admin would show */}
            <JobList key={driverUser.id} user={ driverUser }/>
        </div>

    );
}

export default Home;