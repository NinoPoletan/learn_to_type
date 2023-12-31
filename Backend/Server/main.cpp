#include <drogon/drogon.h>

int main(int argc, char* argv[])
{
#ifdef _DEBUG
    drogon::app().loadConfigFile("bin/configDebug.json");
#else
    drogon::app().loadConfigFile("bin/config.json");
#endif

    drogon::HttpAppFramework::instance()
        .registerHandler("/",
                         [=](const drogon::HttpRequestPtr& req,
                             std::function<void (const drogon::HttpResponsePtr&)>&& callback)
                         {
                             const auto resp = drogon::HttpResponse::newRedirectionResponse("/home/");
                             callback(resp);
                         });
    
    drogon::app().run();
    return 0;
}
