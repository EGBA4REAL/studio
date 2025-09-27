import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CenteringExamplePage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold font-headline">How to Center a Div with Tailwind CSS</h1>

      <Card>
        <CardHeader>
          <CardTitle>Method 1: Using Flexbox</CardTitle>
          <p className="text-muted-foreground pt-2">
            Use `flex`, `justify-center`, and `items-center` to center content *inside* a container. This works for both horizontal and vertical centering.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full bg-muted rounded-lg flex items-center justify-center">
            <div className="p-4 bg-primary text-primary-foreground rounded-md shadow-lg">
              I am centered!
            </div>
          </div>
          <pre className="mt-4 p-4 bg-gray-800 text-white rounded-md overflow-auto">
            <code>
              {`<div className="flex items-center justify-center">`}
              <br />
              {`  <div>I am centered!</div>`}
              <br />
              {`</div>`}
            </code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Method 2: Using Margin Auto</CardTitle>
          <p className="text-muted-foreground pt-2">
            Use `mx-auto` to center a block-level element *itself* horizontally within its parent.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full bg-muted rounded-lg border">
            <div className="w-48 mx-auto mt-8 p-4 bg-accent text-accent-foreground rounded-md shadow-lg text-center">
              I am centered horizontally.
            </div>
          </div>
           <pre className="mt-4 p-4 bg-gray-800 text-white rounded-md overflow-auto">
            <code>
              {`<div className="w-48 mx-auto">`}
              <br />
              {`  I am centered horizontally.`}
              <br />
              {`</div>`}
            </code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
