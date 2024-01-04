#pragma once

#include <drogon/HttpController.h>

class Typing : public drogon::HttpController<Typing>
{
public:
    METHOD_LIST_BEGIN
        METHOD_ADD(Typing::Get, "/", drogon::Get);
    METHOD_LIST_END

public:
    // GET /typing/
    void Get(const drogon::HttpRequestPtr& req,
             std::function<void (const drogon::HttpResponsePtr&)>&& callback) const;
};
