#include "Util.h"
#include <drogon/HttpRequest.h>
#include <drogon/HttpViewData.h>
#include <print>

void Util::AddUserToViewData(drogon::HttpViewData& data, const drogon::HttpRequestPtr& req)
{
    auto& params = req->getParameters();
    auto& cookies = req->getCookies();
    
    data.insert("params", params);

    if (cookies.contains("user"))
    {
        const std::string userData = drogon::utils::base64Decode(cookies.at("user"));

        Json::Value user;
        const Json::CharReaderBuilder builder;
        const std::unique_ptr<Json::CharReader> reader(builder.newCharReader());
        std::string errors;

        if (!userData.empty() && cookies.contains("session"))
        {
            const bool parsingSuccessful = reader->parse(
                userData.c_str(),
                userData.c_str() +
                userData.size(),
                &user,
                &errors);
            
            if (parsingSuccessful)
            {
                data.insert("user", user);
            }
            else
            {
                std::println("Failed to parse JSON: {}", errors);
            }
        }
    }
}
