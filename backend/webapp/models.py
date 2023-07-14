from django.db import models
from django.utils.translation import gettext_lazy as _


class SongFile(models.Model):
    user = models.ForeignKey(
        "accounts.CustomUser", verbose_name=_("Uploader"), on_delete=models.CASCADE
    )
    title = models.CharField(_("Song title"), max_length=50, blank=False, null=False)
    song_author = models.CharField(
        _("Song author"), max_length=50, blank=False, null=False
    )
    song_file = models.FileField(
        _("Song"), upload_to="songs/", max_length=100, blank=False, null=False
    )
    cover_image = models.ImageField(
        _("Song cover image"),
        upload_to="album/",
        default="music-placeholder.jfif",
        blank=True,
        null=True,
    )
    date_uploaded = models.DateTimeField(
        _("Upload date"), auto_now=False, auto_now_add=True
    )

    class Meta:
        ordering = ["-date_uploaded"]

    def __str__(self):
        return f"{self.title} by {self.song_author}"
