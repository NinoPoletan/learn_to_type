#pragma once

#include <drogon/HttpController.h>

class Fuzzy : public drogon::HttpController<Fuzzy>
{
public:
    METHOD_LIST_BEGIN
        METHOD_ADD(Fuzzy::PostAnalyze, "/", drogon::Post);
    METHOD_LIST_END

public:
    // GET /fuzzy/
    void PostAnalyze(const drogon::HttpRequestPtr& req,
                       std::function<void (const drogon::HttpResponsePtr&)>&& callback) const;
    
};
