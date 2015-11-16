from django.shortcuts import render
from django.http import Http404
from .models import Scientist


def index(request):
	return render(request, 'llama/index.html')

def detail(request, idx):
	try:
		obj = Scientist.objects.get(pk=idx)
	except Scientist.DoesNotExist:
		raise Http404("Question does not exist")
	return render(request, 'llama/detail.html', {'description': obj})
