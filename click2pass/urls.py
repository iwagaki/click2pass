from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'click2pass.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^service/$', 'service.views.index'),
    url(r'^service/add_bookmark/$', 'service.views.add_bookmark'),
    url(r'^service/delete_bookmark/(?P<objid>\d+)/$', 'service.views.delete_bookmark'),
    url(r'^service/update_bookmark/(?P<objid>\d+)/$', 'service.views.update_bookmark'),
)
