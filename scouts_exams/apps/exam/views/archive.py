from django.contrib import messages
from django.shortcuts import redirect, render
from django.urls import reverse

from ...teams.models import Patrol
from ..models import Exam
from .utils import prepare_exam


def archive(request):
    if not request.user.is_authenticated:
        return render(request, "exam/archive.html")
    user = request.user
    exams = []
    if request.user.scout.function == 0 or request.user.scout.function == 1:
        messages.add_message(
            request, messages.INFO, "Nie masz uprawnień do edycji prób."
        )
        return redirect(reverse("exam:exam"))
    elif request.user.scout.function == 2:
        for exam in Exam.objects.filter(
            scout__patrol__team__id=user.scout.patrol.team.id,
            scout__function__lt=user.scout.function,
            is_archived=True,
        ).exclude(scout=user.scout):
            exams.append(prepare_exam(exam))
    elif request.user.scout.function == 3 or request.user.scout.function == 4:
        for exam in Exam.objects.filter(
            scout__patrol__team__id=user.scout.patrol.team.id, is_archived=True
        ):
            exams.append(prepare_exam(exam))
    elif request.user.scout.function >= 5:
        for exam in Exam.objects.filter(
            scout__patrol__team__id=user.scout.patrol.team.id, is_archived=True
        ):
            exams.append(prepare_exam(exam))
    for exam in Exam.objects.filter(supervisor__user_id=user.id, is_archived=True):
        exams.append(prepare_exam(exam))
    patrols = Patrol.objects.filter(team__patrol__id=user.scout.patrol.team.id)
    return render(
        request,
        "exam/archive.html",
        {"user": user, "exams_list": exams, "patrols": patrols},
    )
