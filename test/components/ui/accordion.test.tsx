import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionRoot,
  AccordionItem
} from '$/components/ui/accordion'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import { createRef } from 'react'

vi.mock('react-icons/lu', () => ({
  LuChevronDown: () => <svg data-testid='lu-chevron-down-icon' />
}))

describe('AccordionItemTrigger Component', () => {
  it('should render indicator at the end by default', () => {
    render(
      <ChakraProvider>
        <AccordionRoot>
          <AccordionItem value='a'>
            <AccordionItemTrigger>
              <div data-testid='child-content'>Content</div>
            </AccordionItemTrigger>
          </AccordionItem>
        </AccordionRoot>
      </ChakraProvider>
    )

    const trigger = screen.getByTestId('accordion-item-trigger')
    const indicators = screen.getAllByTestId('item-indicator')

    expect(indicators).toHaveLength(1)

    const hStack = screen.getByTestId('hstack')

    expect(hStack).toBeInTheDocument()

    const triggerChildren = Array.from(trigger.children)

    expect(triggerChildren.length).toBe(2)

    expect(triggerChildren[0]).toBe(hStack)
    expect(triggerChildren[1]).toBe(indicators[0])
  })

  it('should render indicator at the start when indicatorPlacement="start"', () => {
    render(
      <ChakraProvider>
        <AccordionRoot>
          <AccordionItem value='a'>
            <AccordionItemTrigger indicatorPlacement='start'>
              <div data-testid='child-content'>Content</div>
            </AccordionItemTrigger>
          </AccordionItem>
        </AccordionRoot>
      </ChakraProvider>
    )

    const trigger = screen.getByTestId('accordion-item-trigger')

    const indicators = screen.getAllByTestId('item-indicator')
    expect(indicators).toHaveLength(1)

    const hStack = screen.getByTestId('hstack')

    expect(hStack).toBeInTheDocument()

    const triggerChildren = Array.from(trigger.children)

    expect(triggerChildren.length).toBe(2)

    expect(triggerChildren[0]).toBe(indicators[0])
    expect(triggerChildren[1]).toBe(hStack)
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLButtonElement>()

    render(
      <ChakraProvider>
        <AccordionRoot>
          <AccordionItem value='a'>
            <AccordionItemTrigger ref={ref}>Content</AccordionItemTrigger>
          </AccordionItem>
        </AccordionRoot>
      </ChakraProvider>
    )

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})

describe('AccordionItemContent Component', () => {
  it('should render content inside Accordion.ItemBody', () => {
    render(
      <ChakraProvider>
        <AccordionRoot>
          <AccordionItem value='a'>
            <AccordionItemContent>
              <div data-testid='content'>Accordion Content</div>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </ChakraProvider>
    )

    const content = screen.getByTestId('content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Accordion Content')
  })

  it('should forward props to Accordion.ItemBody', () => {
    render(
      <ChakraProvider>
        <AccordionRoot>
          <AccordionItem value='a'>
            <AccordionItemContent data-testid='accordion-body' id='test-id'>
              Content
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </ChakraProvider>
    )

    const body = screen.getByTestId('accordion-body')

    expect(body).toHaveAttribute('id', 'test-id')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <ChakraProvider>
        <AccordionRoot>
          <AccordionItem value='a'>
            <AccordionItemContent ref={ref}>Content</AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </ChakraProvider>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
