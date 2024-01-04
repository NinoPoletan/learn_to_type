#include "Typing.h"

#include "Auth.h"
#include "../Util.h"

void Typing::Get(const drogon::HttpRequestPtr& req,
    std::function<void(const drogon::HttpResponsePtr&)>&& callback) const
{
    if (!Auth::Authenticate(req))
    {
        const auto resp = drogon::HttpResponse::newRedirectionResponse("/auth/login");
        callback(resp);
        return;
    }
    
    drogon::HttpViewData data;
    Util::AddUserToViewData(data, req);
    const auto resp = drogon::HttpResponse::newHttpViewResponse("typing.csp", data);
    callback(resp);
}
