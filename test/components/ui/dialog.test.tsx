import React, { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DialogRoot, DialogContent, DialogCloseTrigger } from '$/components/ui/dialog'
import { Provider as ChakraProvider } from '$/components/ui/provider'

vi.mock('$/components/ui/close-button', () => ({
  CloseButton: React.forwardRef(({ children, ...props }: PropsWithChildren, ref: any) => (
    <button ref={ref} {...props}>
      {children}
    </button>
  ))
}))

describe('DialogContent', () => {
  it('should render children inside ChakraDialog.Content', () => {
    render(
      <ChakraProvider>
        <DialogRoot open>
          <DialogContent>
            <div data-testid='child-content'>Child Content</div>
          </DialogContent>
        </DialogRoot>
      </ChakraProvider>
    )

    const dialogContent = screen.getByTestId('dialog-content')
    const childContent = screen.getByTestId('child-content')
    expect(dialogContent).toContainElement(childContent)
  })

  it('should render the backdrop when backdrop is true', () => {
    render(
      <ChakraProvider>
        <DialogRoot open>
          <DialogContent backdrop={true}>
            <div>Content</div>
          </DialogContent>
        </DialogRoot>
      </ChakraProvider>
    )

    const backdrop = document.querySelector('[data-part="backdrop"]')
    expect(backdrop).toBeInTheDocument()
  })

  it('should not render the backdrop when backdrop is false', () => {
    render(
      <ChakraProvider>
        <DialogRoot>
          <DialogContent backdrop={false}>
            <div>Content</div>
          </DialogContent>
        </DialogRoot>
      </ChakraProvider>
    )

    const backdrop = document.querySelector('[data-part="backdrop"]')
    expect(backdrop).not.toBeInTheDocument()
  })

  it('should render within a Portal when portalled is true', () => {
    render(
      <ChakraProvider>
        <DialogRoot open>
          <DialogContent portalled={true}>
            <div>Content</div>
          </DialogContent>
        </DialogRoot>
      </ChakraProvider>
    )

    const dialogContent = screen.getByTestId('dialog-content')
    expect(document.body).toContainElement(dialogContent)
  })

  it('should render without Portal when portalled is false', () => {
    render(
      <ChakraProvider>
        <div data-testid='container'>
          <DialogRoot open>
            <DialogContent portalled={false}>
              <div>Content</div>
            </DialogContent>
          </DialogRoot>
        </div>
      </ChakraProvider>
    )

    const container = screen.getByTestId('container')
    const dialogContent = screen.getByTestId('dialog-content')
    expect(container).toContainElement(dialogContent)
  })

  it('should render in the portalRef when portalRef is provided', () => {
    const portalContainer = document.createElement('div')
    portalContainer.setAttribute('id', 'portal-root')
    document.body.appendChild(portalContainer)

    const portalRef = { current: portalContainer }

    render(
      <ChakraProvider>
        <DialogRoot open>
          <DialogContent portalled portalRef={portalRef}>
            <div>Content</div>
          </DialogContent>
        </DialogRoot>
      </ChakraProvider>
    )

    const dialogContent = screen.getByTestId('dialog-content')
    expect(portalContainer).toContainElement(dialogContent)

    document.body.removeChild(portalContainer)
  })

  it('should forward ref to ChakraDialog.Content', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(
      <ChakraProvider>
        <DialogRoot open>
          <DialogContent ref={ref}>
            <div>Content</div>
          </DialogContent>
        </DialogRoot>
      </ChakraProvider>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-testid', 'dialog-content')
  })
})

describe('DialogCloseTrigger', () => {
  it('should render a CloseButton inside ChakraDialog.CloseTrigger', () => {
    render(
      <ChakraProvider>
        <DialogRoot>
          <DialogCloseTrigger>Close</DialogCloseTrigger>
        </DialogRoot>
      </ChakraProvider>
    )

    const closeButton = screen.getByText('Close')
    expect(closeButton).toBeInTheDocument()
  })

  it('should forward ref to CloseButton', () => {
    const ref = React.createRef<HTMLButtonElement>()

    render(
      <ChakraProvider>
        <DialogRoot>
          <DialogCloseTrigger ref={ref}>Close</DialogCloseTrigger>
        </DialogRoot>
      </ChakraProvider>
    )

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveTextContent('Close')
  })

  it('should render children inside CloseButton', () => {
    render(
      <ChakraProvider>
        <DialogRoot>
          <DialogCloseTrigger>Close</DialogCloseTrigger>
        </DialogRoot>
      </ChakraProvider>
    )

    const closeButton = screen.getByText('Close')
    expect(closeButton).toBeInTheDocument()
  })
})
