import { html } from "lit";
import "./pokemon-main";
import type { Meta, StoryObj } from '@storybook/web-components'

const meta: Meta = {
  title: "PokemonMain",
  component: "pokemon-main",
  args: {
    listOffset: 0,
    listLimit: 20,
    title: "These are our products",
  },
  argTypes: {
    listOffset: { control: "number" },
    listLimit: { control: "number" },
    title: { control: "text" },
  },
};

export default meta

type Story = StoryObj<{
  listLimit: number,
  listOffset: number,
  title: string,
}>;

export const Default: Story = {
  args: {
    listLimit: 20,
    listOffset: 0,
    title: "These are our products",
  },


  render: ({ listLimit, listOffset, title }) => html`
    <pokemon-main
      .listLimit=${listLimit} 
      .listOffset=${listOffset}
      .title=${title}
    ></pokemon-main>
  `,
}
