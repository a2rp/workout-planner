import { Styled } from "./styled";

const Header = () => {
    return (
        <Styled.Wrapper>
            <Styled.Main>
                <Styled.Brand
                    href={import.meta.env.BASE_URL}
                    aria-label="Workout Planner home"
                >
                    <Styled.LogoBox>
                        <Styled.Logo
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="Workout Planner logo"
                        />
                    </Styled.LogoBox>

                    <Styled.BrandContent>
                        <Styled.Label>Personal Training Dashboard</Styled.Label>

                        <Styled.Title>Workout Planner</Styled.Title>
                    </Styled.BrandContent>
                </Styled.Brand>

                <Styled.Text>
                    Plan your workouts, organize exercises and track your
                    training progress directly in your browser.
                </Styled.Text>
            </Styled.Main>

            <Styled.Status>
                <Styled.StatusDot />

                <span>Local data</span>
            </Styled.Status>
        </Styled.Wrapper>
    );
};

export default Header;
