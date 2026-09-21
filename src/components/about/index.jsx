import { Styled } from "./styled";

const developerDetails = [
    {
        label: "Name",
        value: "Ashish Ranjan",
    },
    {
        label: "Role",
        value: "Full-Stack Web Developer",
    },
    {
        label: "Portfolio",
        value: "ashishranjan.net",
        href: "https://www.ashishranjan.net",
    },
    {
        label: "GitHub",
        value: "github.com/a2rp",
        href: "https://github.com/a2rp",
    },
    {
        label: "CodePen",
        value: "codepen.io/ash1198",
        href: "https://codepen.io/ash1198",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/aashishranjan",
        href: "https://www.linkedin.com/in/aashishranjan",
    },
    {
        label: "Facebook",
        value: "facebook.com/theash.ashish",
        href: "https://www.facebook.com/theash.ashish",
    },
    {
        label: "YouTube",
        value: "YouTube Channel",
        href: "https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ",
    },
    {
        label: "Email",
        value: "ash.ranjan09@gmail.com",
        href: "mailto:ash.ranjan09@gmail.com",
        external: false,
    },
];

const About = () => {
    return (
        <Styled.Wrapper>
            <Styled.Container>
                <Styled.Header>
                    <Styled.Label>Developer</Styled.Label>

                    <Styled.Heading>About Developer</Styled.Heading>

                    <Styled.Description>
                        Workout Planner is designed and developed by Ashish
                        Ranjan. The application focuses on a simple, fast and
                        distraction-free experience for planning and tracking
                        workouts.
                    </Styled.Description>
                </Styled.Header>

                <Styled.Content>
                    <Styled.Profile>
                        <Styled.Avatar aria-hidden="true">AR</Styled.Avatar>

                        <Styled.ProfileInfo>
                            <Styled.Name>Ashish Ranjan</Styled.Name>

                            <Styled.Role>Full-Stack Web Developer</Styled.Role>

                            <Styled.ProfileText>
                                Building web applications, developer tools and
                                practical digital products with a focus on
                                usability, performance and clean design.
                            </Styled.ProfileText>
                        </Styled.ProfileInfo>
                    </Styled.Profile>

                    <Styled.Details>
                        {developerDetails.map((item) => (
                            <Styled.Row key={item.label}>
                                <Styled.Key>{item.label}</Styled.Key>

                                <Styled.Value>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={
                                                item.external === false
                                                    ? undefined
                                                    : "_blank"
                                            }
                                            rel={
                                                item.external === false
                                                    ? undefined
                                                    : "noopener noreferrer"
                                            }
                                            aria-label={`${item.label}: ${item.value}`}
                                        >
                                            {item.value}

                                            {item.external !== false && (
                                                <span aria-hidden="true">
                                                    ↗
                                                </span>
                                            )}
                                        </a>
                                    ) : (
                                        item.value
                                    )}
                                </Styled.Value>
                            </Styled.Row>
                        ))}
                    </Styled.Details>
                </Styled.Content>
            </Styled.Container>
        </Styled.Wrapper>
    );
};

export default About;
