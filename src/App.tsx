import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {
    return (
        <>
        <Button needActive>
            Primary
        </Button>

        <Button disabled style={{ marginTop: 20 }}>
            Disabled
        </Button>
        </>
    );
}