import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ChakraProvider } from "@chakra-ui/react"
import React from "react"
import "../../../assets/texts.css"
import "./FAQ.css"

const FAQ = () => {
    return (
        <ChakraProvider>
            <div className="FAQ">
                <h1 className="bigger-heading faq-heading">FAQ</h1>
                <p id="accent">Looking for answers? Here you can find them to the most frequently asked questions.</p>
                <Accordion allowToggle className="accordion">

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    About Us!
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            Welcome to <code>ComicStack</code>, your portal to the captivating world of comics! Founded in 2023 and headquartered in the picturesque city of Yerevan, Armenia, <code>ComicStack</code> is a passionate and dynamic team of creators, artists, and storytellers dedicated to bringing the magic of comics to life. Our journey began with a shared love for the art of storytelling through visuals and words. We embarked on a mission to craft immersive and thought-provoking narratives that transport readers to new dimensions, and since then, we've never looked back. Behind every comic, there's a team of dedicated individuals who pour their hearts and souls into their work. Our talented artists, writers, editors, and visionaries work in harmony to create stories that resonate with readers of all ages. As we continue to expand our universe of comics, we invite you to embark on this incredible journey with us.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    How can I create an account?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            To create an account you need to press User icon on
                            bottom right. After that choose{" "}
                            <code>Create an account</code> option. Then you need to
                            enter your email/username(you can use it to log in),
                            password and password confirmation.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    Where can I see all categories?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            You can find all categories after pressing <code>Genres</code> button on the bottom left.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    How can I suggest/add a comics to CS?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            You need to reach us by <code>info@comicstack.com</code> email. Ensure to tell us your
                            username or
                            email so that we can reward you with premium subscription (for 30 days).
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    How can I see the rate of a comics?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            When you open a comics description page, scroll to the bottom and Bob's your uncle!
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    How can I delete my written comment?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            In the top right of your comment, you can find three dots. After clicking on it, you can
                            edit/delete your comment.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    Whose creation is this perfect site?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            The creators of this wonder are Aram Arakelyan and Davit Tadevosyan. Here is how you can reach
                            us:<br />
                            <code>https://github.com/AramArakelyan777</code><br />
                            <code>https://github.com/DavitT017</code>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    Can I pay with my card?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            Yes, you surely can pay with any card including Visa, MasterCard, and even American Express.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    Is it possible to get back my suspended account?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            To get back your suspended account, you should write an email to
                            <code>support@comicstack.com</code> to explain why we should get back your account and that you
                            guarantee that you will never violate our <code>Terms of Use</code> again.<br />
                            Do not forget to write your BAN code in the subject of the email(visit our support page for
                            details).
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    How can I support ComicStack?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            You can support us via footer section button
                            <code id="coffee">{" "}Buy Us Lots of Coffee☕</code>
                            .
                        </AccordionPanel>
                    </AccordionItem>

                </Accordion>
            </div>
        </ChakraProvider>
    )
}

export default FAQ
