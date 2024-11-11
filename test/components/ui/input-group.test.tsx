import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { InputGroup } from '$/components/ui/input-group'
import { Provider as ChakraProvider } from '$/components/ui/provider'

describe('InputGroup Component', () => {
  it('renders without crashing', () => {
    render(
      <ChakraProvider>
        <InputGroup>
          <input data-testid='child-input' />
        </InputGroup>
      </ChakraProvider>
    )
    expect(screen.getByTestId('input-group')).toBeInTheDocument()
  })

  it('renders startElement when provided', () => {
    render(
      <ChakraProvider>
        <InputGroup startElement={<span data-testid='start-element'>Start</span>}>
          <input />
        </InputGroup>
      </ChakraProvider>
    )
    expect(screen.getByTestId('start-element')).toBeInTheDocument()
  })

  it('renders endElement when provided', () => {
    render(
      <ChakraProvider>
        <InputGroup endElement={<span data-testid='end-element'>End</span>}>
          <input />
        </InputGroup>
      </ChakraProvider>
    )
    expect(screen.getByTestId('end-element')).toBeInTheDocument()
  })

  it('clones child and adds padding when startElement is provided', () => {
    let receivedProps: any = null

    function TestInput(props: any) {
      receivedProps = props
      return <input {...props} />
    }

    render(
      <ChakraProvider>
        <InputGroup startElement={<span>Start</span>}>
          <TestInput />
        </InputGroup>
      </ChakraProvider>
    )

    expect(receivedProps).toHaveProperty('ps', 'calc(var(--input-height) - 6px)')
  })

  it('clones child and adds padding when endElement is provided', () => {
    let receivedProps: any = null

    function TestInput(props: any) {
      receivedProps = props
      return <input {...props} />
    }

    render(
      <ChakraProvider>
        <InputGroup endElement={<span>End</span>}>
          <TestInput />
        </InputGroup>
      </ChakraProvider>
    )

    expect(receivedProps).toHaveProperty('pe', 'calc(var(--input-height) - 6px)')
  })

  it('clones child and adds padding when both startElement and endElement are provided', () => {
    let receivedProps: any = null

    function TestInput(props: any) {
      receivedProps = props
      return <input {...props} />
    }

    render(
      <ChakraProvider>
        <InputGroup startElement={<span>Start</span>} endElement={<span>End</span>}>
          <TestInput />
        </InputGroup>
      </ChakraProvider>
    )

    expect(receivedProps).toHaveProperty('ps', 'calc(var(--input-height) - 6px)')
    expect(receivedProps).toHaveProperty('pe', 'calc(var(--input-height) - 6px)')
  })

  it('merges children props with added padding', () => {
    let receivedProps: any = null

    function TestInput(props: any) {
      receivedProps = props

      return <input {...props} />
    }

    render(
      <ChakraProvider>
        <InputGroup startElement={<span>Start</span>} endElement={<span>End</span>}>
          <TestInput placeholder='Enter text' />
        </InputGroup>
      </ChakraProvider>
    )

    expect(receivedProps).toMatchObject({
      ps: 'calc(var(--input-height) - 6px)',
      pe: 'calc(var(--input-height) - 6px)',
      placeholder: 'Enter text'
    })
  })

  it('passes rest props to Group', () => {
    render(
      <ChakraProvider>
        <InputGroup data-testid='input-group' id='group-id'>
          <input />
        </InputGroup>
      </ChakraProvider>
    )
    expect(screen.getByTestId('input-group')).toHaveAttribute('id', 'group-id')
  })
})
