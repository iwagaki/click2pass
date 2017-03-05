from django.db import models
from django.contrib import admin
from django.utils import timezone

class Bookmark(models.Model):
    title = models.CharField(max_length = 200, default = "")

    url = models.CharField(max_length = 200, default = "")
    org_url = models.CharField(max_length = 200, default = "")    

    has_username = models.BooleanField(default = False)
    username = models.CharField(max_length = 200, default = "")
    username_version = models.IntegerField(default = 0)
    username_has_length = models.IntegerField(default = 8)
    username_has_number = models.BooleanField(default = False)
    username_has_lowercase = models.BooleanField(default = False)

    version = models.IntegerField(default = 0)
    length = models.IntegerField(default = 8)
    has_number = models.BooleanField(default = False)
    has_lowercase = models.BooleanField(default = False)
    has_uppercase = models.BooleanField(default = False)
    has_symbol = models.BooleanField(default = False)

    email = models.CharField(max_length = 200, default = "")
    note = models.CharField(max_length = 200, default = "")

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

        self.has_username = True if request.GET['has_username'] == '1' else False
        self.username = request.GET['username']
        self.username_version = request.GET['username_version']
        self.username_length = request.GET['username_length']
        self.username_has_number = True if request.GET['username_has_number'] == '1' else False
        self.username_has_lowercase = True if request.GET['username_has_lowercase'] == '1' else False

        self.version = request.GET['version']
        self.length = request.GET['length']
        self.has_number = True if request.GET['has_number'] == '1' else False
        self.has_lowercase = True if request.GET['has_lowercase'] == '1' else False
        self.has_uppercase = True if request.GET['has_uppercase'] == '1' else False
        self.has_symbol = True if request.GET['has_symbol'] == '1' else False

        self.email = request.GET['email']
        self.note = request.GET['note']

        
admin.site.register(Bookmark)
