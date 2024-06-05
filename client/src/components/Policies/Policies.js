import React, { useState, useEffect } from "react"
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
import { useLocation } from "react-router-dom"

const Policies = () => {
    const { t } = useTranslation()
    const location = useLocation()
    const [defaultIndex, setDefaultIndex] = useState(-1)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const section = params.get("section")
        switch (section) {
            case "policy":
                setDefaultIndex(0)
                break
            case "agreement":
                setDefaultIndex(1)
                break
            case "cookies":
                setDefaultIndex(2)
                break
            case "terms":
                setDefaultIndex(3)
                break
            default:
                setDefaultIndex(-1)
                break
        }
    }, [location.search])

    return (
        <ChakraProvider>
            <div>
                <h1 className="bigger-heading">{t("policiesHeading")}</h1>
                <Accordion
                    index={defaultIndex !== -1 ? [defaultIndex] : undefined}
                    allowToggle
                    className="accordion"
                >
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
                        <AccordionPanel textAlign="left">
                            {t("privacyPolicyText")}
                        </AccordionPanel>
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
                        <AccordionPanel textAlign="left">
                            {t("userAgreementText")}
                        </AccordionPanel>
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
                        <AccordionPanel textAlign="left">
                            {t("cookiesText")}
                        </AccordionPanel>
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
                        <AccordionPanel textAlign="left">
                            {t("termsText")}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </ChakraProvider>
    )
}

export default Policies
