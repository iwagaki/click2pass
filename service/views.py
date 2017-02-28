# -*- coding: utf-8 -*-      

from django.shortcuts import render_to_response
from service.models import Bookmark
from django.utils import timezone

import logging
logger = logging.getLogger(__name__)

from django.http import HttpResponse

#from django.views.decorators.cache import never_cache

import logging
logger = logging.getLogger(__name__)

#@never_cache

def delete_bookmark(request, objid):
    bookmark_set = Bookmark.objects.filter(id = objid)
    bookmark_set.delete()

    return HttpResponse('Successsfully Updated')

def add_bookmark(request):
#    logger.debug("this is a debug message!")

    new_bookmark = Bookmark()
    new_bookmark.add(request)
    new_bookmark.save()
  
    return HttpResponse('Successsfully Updated')

def update_bookmark(request, objid):
    bookmark_set = Bookmark.objects.filter(id = objid)
    bookmark = bookmark_set[0]

    bookmark.update(request)
    bookmark.save()
  
    return HttpResponse('Successsfully Updated')

def index(request):
    bookmark_list = Bookmark.objects.all().order_by('-created_date')

    return render_to_response('index.html', {'bookmark_list': bookmark_list})
