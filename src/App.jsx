import About from "./components/about";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/scrollToTopButton";
import WorkoutPlanner from "./components/workoutPlanner";

const App = () => {
    return (
        <>
            <WorkoutPlanner />

            <About />

            <Footer />

            <ScrollToTopButton />
        </>
    );
};

export default App;
