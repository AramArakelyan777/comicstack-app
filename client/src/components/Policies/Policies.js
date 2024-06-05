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
import { useTranslation } from "react-i18next"

const Policies = () => {
    const { t } = useTranslation()
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
                                    {t("policy")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">{t("privacyPolicyText")}</AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    {t("agreement")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">{t("userAgreementText")}</AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    {t("cookies")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">{t("cookiesText")}</AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className="accordion-item">
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: "#DB4947", color: "white" }}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    {t("terms")}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel textAlign="left">{t("termsText")}</AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </ChakraProvider>
    )
}

export default Policies
