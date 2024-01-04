#pragma once

#include <drogon/HttpController.h>

class Home : public drogon::HttpController<Home>
{
public:
    METHOD_LIST_BEGIN
        METHOD_ADD(Home::Get, "/", drogon::Get);
    METHOD_LIST_END

public:
    // GET /home
    void Get(const drogon::HttpRequestPtr& req,
             std::function<void (const drogon::HttpResponsePtr&)>&& callback) const;
};
