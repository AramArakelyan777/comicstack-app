import React from "react"
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ChakraProvider,
} from "@chakra-ui/react"

const Policies = () => {
    return (
        <ChakraProvider>
            <div>
                <h1 className="bigger-heading">Policies</h1>
                <Accordion allowToggle className="accordion">
                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    Privacy Policy
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">text</AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    User Agreement
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">text</AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    Cookie Statement
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">text</AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    Terms of Use
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">text</AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </ChakraProvider>
    )
}

export default Policies
