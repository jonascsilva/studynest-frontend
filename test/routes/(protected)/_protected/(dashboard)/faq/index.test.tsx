import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Component } from '$/routes/(protected)/_protected/(dashboard)/_dashboard/faq/index.lazy'
import { PropsWithChildren } from 'react'
import { renderWithContext } from '../../../../../customRender'

vi.mock('$/routes/(protected)/_protected/(dashboard)/_dashboard/faq/items.json', () => ({
  faq: [
    { question: 'What is your name?', answer: 'My name is OpenAI GPT-4' },
    { question: 'What is your quest?', answer: 'To seek the Holy Grail' }
  ],
  links: [
    { href: 'https://www.example.com', text: 'Example' },
    { href: 'https://www.google.com', text: 'Google' }
  ]
}))

vi.mock('$/components/ui/accordion.tsx', () => ({
  AccordionItem: ({ children, ...props }: PropsWithChildren) => (
    <div data-testid='accordion-item' {...props}>
      {children}
    </div>
  ),
  AccordionItemContent: ({ children, ...props }: PropsWithChildren) => (
    <div data-testid='accordion-item-content' {...props}>
      {children}
    </div>
  ),
  AccordionItemTrigger: ({ children, ...props }: PropsWithChildren) => (
    <button data-testid='accordion-item-trigger' {...props}>
      {children}
    </button>
  ),
  AccordionRoot: ({ children, ...props }: PropsWithChildren) => (
    <div data-testid='accordion-root' {...props}>
      {children}
    </div>
  )
}))

describe('Component', () => {
  it('renders the FAQ heading', () => {
    renderWithContext(() => <Component />)

    const heading = screen.getByRole('heading', { level: 2, name: /FAQ/i })

    expect(heading).toBeInTheDocument()
  })

  it('renders the correct number of AccordionItems', () => {
    renderWithContext(() => <Component />)

    const accordionItems = screen.getAllByTestId('accordion-item')

    expect(accordionItems).toHaveLength(2)
  })

  it('renders AccordionItemTriggers with correct questions', () => {
    renderWithContext(() => <Component />)

    const triggers = screen.getAllByTestId('accordion-item-trigger')

    expect(triggers).toHaveLength(2)
    expect(triggers[0]).toHaveTextContent('What is your name?')
    expect(triggers[1]).toHaveTextContent('What is your quest?')
  })

  it('renders AccordionItemContents with correct answers', () => {
    renderWithContext(() => <Component />)

    const contents = screen.getAllByTestId('accordion-item-content')

    expect(contents).toHaveLength(2)
    expect(contents[0]).toHaveTextContent('My name is OpenAI GPT-4')
    expect(contents[1]).toHaveTextContent('To seek the Holy Grail')
  })

  it('renders the Links section with correct heading', () => {
    renderWithContext(() => <Component />)

    const heading = screen.getByRole('heading', { level: 2, name: /Links úteis/i })

    expect(heading).toBeInTheDocument()
  })

  it('renders the correct number of links', () => {
    renderWithContext(() => <Component />)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', 'https://www.example.com')
    expect(links[0]).toHaveTextContent('Example')
    expect(links[1]).toHaveAttribute('href', 'https://www.google.com')
    expect(links[1]).toHaveTextContent('Google')
  })
})
