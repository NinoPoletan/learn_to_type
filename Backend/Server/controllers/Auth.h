#pragma once

#include <drogon/HttpController.h>

class Auth : public drogon::HttpController<Auth>
{
public:
    METHOD_LIST_BEGIN
        METHOD_ADD(Auth::GetLogin, "/login", drogon::Get);
        METHOD_ADD(Auth::GetLogout, "/logout", drogon::Get);
    METHOD_LIST_END

public:
    static bool Authenticate(const drogon::HttpRequestPtr& req);

public:
    // GET /auth/login
    void GetLogin(const drogon::HttpRequestPtr& req,
                  std::function<void (const drogon::HttpResponsePtr&)>&& callback) const;

    // GET /auth/logout
    void GetLogout(const drogon::HttpRequestPtr& req,
                   std::function<void (const drogon::HttpResponsePtr&)>&& callback) const;
};
