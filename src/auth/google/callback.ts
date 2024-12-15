import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
        res.status(400).json({ error: "Invalid code" });
        return;
    }

    try {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
        const redirectUri = `${req.headers.origin}/auth/google/callback`;

        // Google에 액세스 토큰 요청
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        // Google 사용자 정보 요청
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const userInfo = await userInfoResponse.json();

        // 사용자 정보를 클라이언트에 전달
        res.status(200).json(userInfo);
    } catch (error) {
        console.error("Failed to fetch user info:", error);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
}
