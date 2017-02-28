from django.db import models
from django.contrib import admin
from django.utils import timezone

class Bookmark(models.Model):
    title = models.CharField(max_length = 200)
    url = models.CharField(max_length = 200)
    org_url = models.CharField(max_length = 200)    
    username = models.CharField(max_length = 200)
    version = models.IntegerField()
    length = models.IntegerField()
    has_number = models.BooleanField(default = False)
    has_lowercase = models.BooleanField(default = False)
    has_uppercase = models.BooleanField(default = False)
    has_symbol = models.BooleanField(default = False)
    created_date = models.DateTimeField()

    def __unicode__(self):
        return self.title

    def add(self, request):
        self.created_date = timezone.now()
        self.org_url = request.GET['url']
        self.update(request);
    
    def update(self, request):
        self.title = request.GET['title']
        self.url = request.GET['url']
        self.username = request.GET['username']
        self.version = request.GET['version']
        self.length = request.GET['length']
        self.has_number = True if request.GET['has_number'] == '1' else False
        self.has_lowercase = True if request.GET['has_lowercase'] == '1' else False
        self.has_uppercase = True if request.GET['has_uppercase'] == '1' else False
        self.has_symbol = True if request.GET['has_symbol'] == '1' else False
    
admin.site.register(Bookmark)
