#include "Auth.h"
#include <drogon/HttpClient.h>

bool Auth::Authenticate(const drogon::HttpRequestPtr& req)
{
    const auto client = drogon::HttpClient::newHttpClient("http://localhost:3000");
    req->setMethod(drogon::Get);
    req->setPath("/validate");
    const auto resp = client->sendRequest(req);

    return resp.second->getStatusCode() == drogon::k200OK;
}

void Auth::GetLogin(const drogon::HttpRequestPtr& req,
                    std::function<void(const drogon::HttpResponsePtr&)>&& callback) const
{
    const auto resp = drogon::HttpResponse::newRedirectionResponse("http://localhost:3000/login");
    callback(resp);
}

void Auth::GetLogout(const drogon::HttpRequestPtr& req,
                     std::function<void(const drogon::HttpResponsePtr&)>&& callback) const
{
    const auto resp = drogon::HttpResponse::newRedirectionResponse("http://localhost:3000/logout");
    callback(resp);
}
