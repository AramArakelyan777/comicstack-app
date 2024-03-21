import React from "react"
import Input from "./Input"

export default {
    title: "Input",
    component: Input,
}

const Template = (args) => <Input {...args} />

export const Search = Template.bind({})
Search.args = {
    variant: "search",
}

export const Small = Template.bind({})
Small.args = {
    variant: "small",
}
