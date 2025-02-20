import uuid

from django.db import models
from django.db.models import UUIDField
from django.urls import reverse

from ..users.models import User

STATUS = ((0, "Draft"), (1, "Publish"))


class Post(models.Model):
    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="blog_posts"
    )
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    minimum_function = models.IntegerField(choices=User.FUNCTION_CHOICES, default=0)

    class Meta:
        ordering = ["-created_on"]

    def __str__(self) -> str:
        return str(self.title)

    def get_absolute_url(self):
        return reverse("blog:post_detail", kwargs={"slug": str(self.slug)})
