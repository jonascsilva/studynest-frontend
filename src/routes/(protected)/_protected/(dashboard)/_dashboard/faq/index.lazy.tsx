import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot
} from '$/components/ui/accordion'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Heading, Link, List } from '@chakra-ui/react'

import { faq, links } from './items.json'
import classes from './index.module.scss'

const Route = createLazyFileRoute('/(protected)/_protected/(dashboard)/_dashboard/faq/')({
  component: Component
})

function Component() {
  return (
    <div className={classes.container}>
      <Heading size='4xl' px='2rem' pt='2rem'>
        FAQ
      </Heading>
      <section className={classes.section}>
        <AccordionRoot multiple size='lg'>
          {faq.map((item, index) => (
            <AccordionItem key={item.question} value={String(index)}>
              <AccordionItemTrigger>{item.question}</AccordionItemTrigger>
              <AccordionItemContent>{item.answer}</AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
        <div className={classes.linksSection}>
          <Heading size='3xl'>Links úteis</Heading>
          <List.Root as='ol'>
            {links.map(link => (
              <List.Item key={link.href}>
                <Link target='_blank' href={link.href}>
                  {link.text}
                </Link>
              </List.Item>
            ))}
          </List.Root>
        </div>
      </section>
    </div>
  )
}

export { Route, Component }
