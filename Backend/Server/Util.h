#pragma once

#include <drogon/HttpRequest.h>

namespace drogon
{
    class HttpViewData;
}

namespace Util
{
    void AddUserToViewData(drogon::HttpViewData& data, const drogon::HttpRequestPtr& req);
};
