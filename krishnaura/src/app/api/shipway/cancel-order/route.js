import { NextResponse } from 'next/server';

export async function POST(request) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${process.env.SHIPWAY_AUTH}`);
    myHeaders.append("Content-Type", "application/json");

    const payload = await request.json();
    try {
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(payload),
            redirect: "follow"
        };


        const response = await fetch("https://app.shipway.com/api/Cancelorders/", requestOptions);

        if (!response.ok) {

            const errorData = await response.json();
            console.log(errorData)
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        const result = await response.json();
        console.log(result)
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error canceling orders:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
