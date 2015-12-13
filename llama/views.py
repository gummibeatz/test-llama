from django.shortcuts import render, render_to_response, redirect
from django.http import Http404
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from .models import Scientist

def detail(request, idx):
    try:
        obj = Scientist.objects.get(pk=idx)
    except Scientist.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'llama/detail.html', {'description': obj})

def login(request):
    # context = RequestContext(request, {
    #     'request': request, 'user': request.user})
    # return render_to_response('login.html', context_instance=context)
    return render(request, 'llama/index.html')

def home(request):
    if request.user.is_authenticated():
        print("user is authed")
        return render(request, 'llama/index.html')
    return render(request, 'home.html')

@login_required(login_url='/')

def index(request):
    return render(request, 'llama/index.html')

def logout(request):
    auth_logout(request)
    return redirect('/')
