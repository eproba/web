from apps.users.utils import min_function, patrol_required
from django.shortcuts import render

from ...teams.models import Patrol
from ..models import Worksheet
from .utils import prepare_worksheet


@patrol_required
@min_function(2)
def archive(request):
    user = request.user
    worksheets = []
    if request.user.function == 2:
        worksheets.extend(
            prepare_worksheet(worksheet)
            for worksheet in Worksheet.objects.filter(
                user__patrol__team__id=user.patrol.team.id,
                function__lt=user.function,
                is_archived=True,
                deleted=False,
            ).exclude(user=user)
        )

    elif request.user.function in [3, 4]:
        worksheets.extend(
            prepare_worksheet(worksheet)
            for worksheet in Worksheet.objects.filter(
                user__patrol__team__id=user.patrol.team.id,
                is_archived=True,
                deleted=False,
            )
        )

    elif request.user.function >= 5:
        worksheets.extend(
            prepare_worksheet(worksheet)
            for worksheet in Worksheet.objects.filter(
                user__patrol__team__id=user.patrol.team.id,
                is_archived=True,
                deleted=False,
            )
        )

    worksheets.extend(
        prepare_worksheet(worksheet)
        for worksheet in Worksheet.objects.filter(
            supervisor__id=user.id, is_archived=True, deleted=False
        )
    )

    patrols = Patrol.objects.filter(team__id=user.patrol.team.id).order_by("name")
    return render(
        request,
        "worksheets/archive.html",
        {"user": user, "worksheets_list": worksheets, "patrols": patrols},
    )
