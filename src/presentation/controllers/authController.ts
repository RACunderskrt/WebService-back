import { Express, Response, Request } from "express";
import { OAuth2Client } from "google-auth-library";

const credentials = require("../../../credentials.json");

export class AuthController {
  private oauth2Client = new OAuth2Client(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  );

  constructor() {}

  registerRoutes(app: Express) {
    app.get("/oauthgoogle", this.redirectToGoogle.bind(this));
    app.get("/oauthgoogle/callback", this.authenticate.bind(this));
  }

  async redirectToGoogle(req: Request, res: Response) {
    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "openid",
        "profile",
        "email"
      ],
    });

    res.redirect(authUrl);
  }

  async authenticate(req: Request, res: Response) {
    try {
      const code = req.query.code;

      if (typeof code !== "string") {
        return res.status(400).json({
          success: false,
          error: "Missing authorization code",
        });
      }

      const { tokens } = await this.oauth2Client.getToken(code);

      if (!tokens.id_token) {
        return res.status(400).json({
          success: false,
          error: "No ID token returned by Google",
        });
      }

      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: credentials.web.client_id,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(401).json({
          success: false,
          error: "Invalid Google token",
        });
      }

      return res.json({
        success: true,
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
      });
    } catch (error) {
      console.error("Google OAuth error:", error);

      return res.status(500).json({
        success: false,
        error: "Authentication failed",
      });
    }
  }
}