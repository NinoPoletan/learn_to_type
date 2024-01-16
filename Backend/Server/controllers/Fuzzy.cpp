#include "Fuzzy.h"
#include <drogon/HttpClient.h>
#include <print>

void Fuzzy::PostAnalyze(const drogon::HttpRequestPtr& req,
                        std::function<void(const drogon::HttpResponsePtr&)>&& callback) const
{
    const drogon::HttpClientPtr client = drogon::HttpClient::newHttpClient("http://localhost:5000");
    req->setPath("/fuzzy_gtp");
    req->setContentTypeCode(drogon::CT_APPLICATION_JSON);
    const auto fuzzyResponse = client->sendRequest(req);
    
    const auto resp = drogon::HttpResponse::newHttpJsonResponse(*fuzzyResponse.second->jsonObject());
    callback(resp);
}
