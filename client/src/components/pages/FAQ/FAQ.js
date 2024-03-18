import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ChakraProvider } from "@chakra-ui/react"
import React from "react"
import "../../../assets/texts.css"
import "./FAQ.css"

const FAQ = () => {
    return (
        <ChakraProvider>
            <h1 className="bigger-heading faq-heading">FAQ</h1>
            <Accordion className="accordion">
                <AccordionItem>
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

                <AccordionItem>
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

                <AccordionItem>
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

                <AccordionItem>
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

                <AccordionItem>
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

                <AccordionItem>
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

                <AccordionItem>
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

                <AccordionItem>
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

                <AccordionItem>
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
                        <code id="coffee">Buy Us Lots of Coffee☕</code>
                        .
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>

        </ChakraProvider>
    )
}

export default FAQ
