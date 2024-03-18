import React from "react"
import "./FAQ.css"
import { ChakraProvider, Box } from "@chakra-ui/react"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react"
import "../../../assets/texts.css"

const FAQ = () => {
    return (
        <ChakraProvider>
            <h1 className="bigger-heading faq-heading">FAQ</h1>
            <Accordion allowMultiple className="accordion">
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
            </Accordion>
        </ChakraProvider>
    )
}

export default FAQ
