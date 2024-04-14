import React from "react"
import Button from "./Button"

export default {
    title: "Button",
    component: Button,
}

const Template = (args) => <Button {...args} />

export const Ordinary = Template.bind({})
Ordinary.args = {
    variant: "ordinary",
    children: "ORDINARY"
}

export const Tags = Template.bind({})
Tags.args = {
    variant: "tags",
    children: "TAG"
}

export const Donate = Template.bind({})
Tags.args = {
    variant: "donate",
    children: "Buy us lots of coffee"
}
