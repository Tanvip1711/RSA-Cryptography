#include "crow/app.h"
#include "rsa.h"
#include <cstdlib>
#include <string>
#include <vector>

int main()
{
    crow::SimpleApp app;

    RSA rsa;

    // Educational RSA key pair
    if (!rsa.generateKeys(61, 53))
    {
        return 1;
    }

    // ==========================================
    // HOME / HEALTH CHECK
    // ==========================================

    CROW_ROUTE(app, "/")
    ([]()
    {
        crow::json::wvalue result;

        result["success"] = true;
        result["message"] = "RSA Backend is running!";
        result["version"] = "1.0";

        return crow::response(result);
    });


    // ==========================================
    // GET RSA KEYS
    // ==========================================

    CROW_ROUTE(app, "/keys")
    ([&rsa]()
    {
        crow::json::wvalue result;

        result["success"] = true;

        result["p"] = rsa.getP();
        result["q"] = rsa.getQ();
        result["n"] = rsa.getN();
        result["phi"] = rsa.getPhi();

        result["public_key"]["e"] = rsa.getE();
        result["public_key"]["n"] = rsa.getN();

        result["private_key"]["d"] = rsa.getD();
        result["private_key"]["n"] = rsa.getN();

        return crow::response(result);
    });


    // ==========================================
    // ENCRYPT NUMBER
    // ==========================================

    CROW_ROUTE(app, "/encrypt").methods(crow::HTTPMethod::POST)
    ([&rsa](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(400, "Invalid JSON");
        }

        if (!body.has("message"))
        {
            return crow::response(400, "Missing 'message'");
        }

        try
        {
            long long message = body["message"].i();

            long long encrypted = rsa.encrypt(message);

            crow::json::wvalue result;

            result["success"] = true;
            result["message"] = message;
            result["encrypted"] = encrypted;

            return crow::response(result);
        }
        catch (const std::exception& error)
        {
            return crow::response(400, error.what());
        }
    });


    // ==========================================
    // DECRYPT NUMBER
    // ==========================================

    CROW_ROUTE(app, "/decrypt").methods(crow::HTTPMethod::POST)
    ([&rsa](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(400, "Invalid JSON");
        }

        if (!body.has("cipher"))
        {
            return crow::response(400, "Missing 'cipher'");
        }

        try
        {
            long long cipher = body["cipher"].i();

            long long decrypted = rsa.decrypt(cipher);

            crow::json::wvalue result;

            result["success"] = true;
            result["cipher"] = cipher;
            result["decrypted"] = decrypted;

            return crow::response(result);
        }
        catch (const std::exception& error)
        {
            return crow::response(400, error.what());
        }
    });


    // ==========================================
    // ENCRYPT TEXT
    // ==========================================

    CROW_ROUTE(app, "/encrypt-text").methods(crow::HTTPMethod::POST)
    ([&rsa](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(400, "Invalid JSON");
        }

        if (!body.has("message"))
        {
            return crow::response(400, "Missing 'message'");
        }

        try
        {
            std::string message = body["message"].s();

            if (message.empty())
            {
                return crow::response(400, "Message cannot be empty");
            }

            std::vector<long long> encrypted = rsa.encryptText(message);

            crow::json::wvalue result;

            result["success"] = true;
            result["message"] = message;

            crow::json::wvalue::list encryptedList;

            for (long long value : encrypted)
            {
                  encryptedList.push_back(crow::json::wvalue(static_cast<int64_t>(value)));
            }

            result["encrypted"] = std::move(encryptedList);

            return crow::response(result);
        }
        catch (const std::exception& error)
        {
            return crow::response(400, error.what());
        }
    });


    // ==========================================
    // DECRYPT TEXT
    // ==========================================

    CROW_ROUTE(app, "/decrypt-text").methods(crow::HTTPMethod::POST)
    ([&rsa](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(400, "Invalid JSON");
        }

        if (!body.has("cipher"))
        {
            return crow::response(400, "Missing 'cipher'");
        }

        try
        {
            std::vector<long long> cipher;

            for (const auto& value : body["cipher"])
            {
                cipher.push_back(value.i());
            }

            if (cipher.empty())
            {
                return crow::response(400, "Cipher cannot be empty");
            }

            std::string decrypted = rsa.decryptText(cipher);

            crow::json::wvalue result;

            result["success"] = true;
            result["decrypted"] = decrypted;

            return crow::response(result);
        }
        catch (const std::exception& error)
        {
            return crow::response(400, error.what());
        }
    });


    // ==========================================
    // START SERVER
    // ==========================================

const char* portEnv = std::getenv("PORT");
int port = portEnv ? std::stoi(portEnv) : 18080;

app.bindaddr("0.0.0.0").port(port).multithreaded().run();
}