import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader";
import SiteFooter from "./components/siteFooter";
import BackToTop from "./components/backToTop";
import WorkoutPlanner from "./components/workoutPlanner";

const repository = "https://github.com/a2rp/workout-planner";
const App = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return <div className={styles["app-shell"]} id="top">
        <SiteHeader title="Repbook" mark="R" navItems={[["Overview", "#overview"], ["Workout plans", "#plans"], ["Add a workout", "#builder"]]} repoUrl={repository} />
        <main className={styles.pageContent}><WorkoutPlanner /></main>
        <SiteFooter repoUrl={repository} />
        <BackToTop visible={showBackToTop} />
    </div>;
};
export default App;
