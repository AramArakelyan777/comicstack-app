import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ChakraProvider,
} from "@chakra-ui/react"
import React from "react"
import "../../../assets/texts.css"
import "./FAQ.css"
import { useTranslation } from "react-i18next"

const FAQ = () => {
    const { t } = useTranslation()

    return (
        <ChakraProvider>
            <div className="FAQ">
                <h1 className="bigger-heading">{t("faqHeading")}</h1>
                <p className="medium-heading">{t("faqSubheading")}</p>
                <Accordion allowToggle className="accordion">
                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    {t("faqFirstQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                            {t("faqFirstAnswer")}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white"}}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    {t("faqSecQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqSecAnswer")}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                {t("faqThirdQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqThirdAnswer")}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                {t("faqFourthQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqFourthAnswer")}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                {t("faqFifthQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqFifthAnswer")}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                {t("faqSixthQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqSixthAnswer")}
                            <br />
                            <code>https://github.com/AramArakelyan777</code>
                            <br />
                            <code>https://github.com/DavitT017</code>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                {t("faqSeventhQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqSeventhAnswer")}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                {t("faqEighthQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqEighthAnswer")}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                {t("faqNinthQuestion")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">
                        {t("faqNinthAnswer")}
                            <code id="coffee">{' '}{t("footerDonateButton")}☕</code>.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </ChakraProvider>
    )
}

export default FAQ
