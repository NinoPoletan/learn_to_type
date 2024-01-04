#include "Home.h"
#include "../Util.h"

void Home::Get(const drogon::HttpRequestPtr& req, std::function<void(const drogon::HttpResponsePtr&)>&& callback) const
{
    drogon::HttpViewData data;
    Util::AddUserToViewData(data, req);
    const auto resp = drogon::HttpResponse::newHttpViewResponse("home.csp", data);
    callback(resp);
}
