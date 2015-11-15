from django.shortcuts import render
from django.http import Http404
from .models import Scientist


def index(request):
	latest_question_list = Question.objects.order_by('-pub_date')[:5]
	context = {'latest_question_list': latest_question_list}
	return render(request, 'polls/index.html', context)

def detail(request, idx):
	try:
		obj = Scientist.objects.get(pk=idx)
	except Scientist.DoesNotExist:
		raise Http404("Question does not exist")
	return render(request, 'llama/detail.html', {'description': obj})