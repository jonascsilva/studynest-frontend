import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Tooltip } from '$/components/ui/tooltip'
import { Provider as ChakraProvider } from '$/components/ui/provider'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'

describe('Tooltip Component', () => {
  it('should render children without Tooltip when disabled is true', () => {
    render(
      <ChakraProvider>
        <Tooltip disabled content='Tooltip content'>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    expect(screen.getByText('Hover me')).toBeInTheDocument()
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })

  it('should render Tooltip when disabled is false', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content'>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    expect(trigger).toBeInTheDocument()

    await user.hover(trigger)

    const tooltipContent = await screen.findByText('Tooltip content')

    expect(tooltipContent).toBeInTheDocument()
  })

  it('should render Tooltip with arrow when showArrow is true', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content' showArrow>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    const tooltipContent = await screen.findByText('Tooltip content')
    expect(tooltipContent).toBeInTheDocument()

    const arrow = tooltipContent.querySelector('[data-part="arrow"]')
    expect(arrow).toBeInTheDocument()
  })

  it('should render Tooltip without arrow when showArrow is false', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content' showArrow={false}>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    const tooltipContent = await screen.findByText('Tooltip content')
    expect(tooltipContent).toBeInTheDocument()

    const arrow = tooltipContent.querySelector('[data-part="arrow"]')
    expect(arrow).not.toBeInTheDocument()
  })

  it('should render Tooltip content inside a Portal when portalled is true', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content' portalled>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    const tooltipContent = await screen.findByText('Tooltip content')

    expect(tooltipContent).toBeInTheDocument()

    expect(document.body).toContainElement(tooltipContent)
  })

  it('should render Tooltip content without Portal when portalled is false', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content' portalled={false}>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    const tooltipContent = await screen.findByText('Tooltip content')
    expect(tooltipContent).toBeInTheDocument()

    expect(trigger.parentElement).toContainElement(tooltipContent)
  })

  it('should pass contentProps to ChakraTooltip.Content', async () => {
    const user = userEvent.setup()

    render(
      <ChakraProvider>
        <Tooltip
          content='Tooltip content'
          contentProps={{ 'data-testid': 'tooltip-content' } as any}
        >
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    const tooltipContent = await screen.findByTestId('tooltip-content')
    expect(tooltipContent).toBeInTheDocument()
    expect(tooltipContent).toHaveTextContent('Tooltip content')
  })

  it('should forward ref to ChakraTooltip.Content', async () => {
    const user = userEvent.setup()

    const ref = createRef<HTMLDivElement>()

    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content' ref={ref}>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    await screen.findByText('Tooltip content')

    expect(ref.current).not.toBeNull()
    expect(ref.current).toHaveTextContent('Tooltip content')
  })

  it('should render children inside ChakraTooltip.Trigger', () => {
    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content'>
          <button data-testid='trigger-button'>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByTestId('trigger-button')

    expect(trigger).toBeInTheDocument()
  })

  it('should render content inside portal container when portalRef is provided', async () => {
    const user = userEvent.setup()

    const portalContainer = document.createElement('div')

    portalContainer.setAttribute('id', 'portal-root')

    document.body.appendChild(portalContainer)

    render(
      <ChakraProvider>
        <Tooltip content='Tooltip content' portalled portalRef={{ current: portalContainer }}>
          <button>Hover me</button>
        </Tooltip>
      </ChakraProvider>
    )

    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    const tooltipContent = await screen.findByText('Tooltip content')
    expect(tooltipContent).toBeInTheDocument()

    expect(portalContainer).toContainElement(tooltipContent)

    document.body.removeChild(portalContainer)
  })
})
