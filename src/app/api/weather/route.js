export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    const apiKey = 'df018257af67ef2084ae4265485d5208';
    const res = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
    );

    const data = await res.json();

    return Response.json(data);
}