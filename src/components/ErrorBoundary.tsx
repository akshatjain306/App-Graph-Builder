import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

 override componentDidCatch(
    error: Error,
    errorInfo: React.ErrorInfo,
  ) {
    console.error(
      error,
      errorInfo,
    );
  }

override  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="rounded-lg border p-6">
            <h2 className="font-semibold">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Please refresh the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}