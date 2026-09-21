import { Styled } from "./styled";

const navigationLinks = [
    {
        label: "Portfolio",
        href: "https://www.ashishranjan.net",
    },
    {
        label: "GitHub",
        href: "https://github.com/a2rp",
    },
    {
        label: "CodePen",
        href: "https://codepen.io/ash1198",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish",
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ",
    },
];

const supportLinks = [
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/a2rp",
    },
    {
        label: "Patreon",
        href: "https://www.patreon.com/a2rp",
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Styled.Wrapper>
            <Styled.Container>
                <Styled.Top>
                    <Styled.BrandSection>
                        <Styled.Brand
                            href="https://www.ashishranjan.net"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Workout Planner
                        </Styled.Brand>

                        <Styled.Description>
                            A simple and focused workout planning application
                            for organizing exercises, tracking sessions and
                            staying consistent.
                        </Styled.Description>
                    </Styled.BrandSection>

                    <Styled.LinkSection>
                        <Styled.LinkGroup>
                            <Styled.LinkTitle>Links</Styled.LinkTitle>

                            <Styled.Links>
                                {navigationLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label}
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                ))}
                            </Styled.Links>
                        </Styled.LinkGroup>

                        <Styled.LinkGroup>
                            <Styled.LinkTitle>Support</Styled.LinkTitle>

                            <Styled.Links>
                                {supportLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label}
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                ))}
                            </Styled.Links>
                        </Styled.LinkGroup>
                    </Styled.LinkSection>
                </Styled.Top>

                <Styled.Bottom>
                    <Styled.Copyright>
                        &copy; {currentYear}{" "}
                        <a
                            href="https://www.ashishranjan.net"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ashish Ranjan
                        </a>
                        . All rights reserved.
                    </Styled.Copyright>

                    <Styled.Note>Built with React</Styled.Note>
                </Styled.Bottom>
            </Styled.Container>
        </Styled.Wrapper>
    );
};

export default Footer;
